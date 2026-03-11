const fs = require("fs");
const path = require("path");

// Configuration
const ROOT_DIR = path.join(__dirname, "..", "..");
const README_PATH = path.join(ROOT_DIR, "README.md");
const MARKER_START = "<!-- AUTO-GENERATED-DOCS-START -->";
const MARKER_END = "<!-- AUTO-GENERATED-DOCS-END -->";

/**
 * Recursively find all markdown files in the workspace
 * @param {string} dir - Directory to search
 * @param {string} baseDir - Base directory for relative paths
 * @returns {Array} Array of file objects with path and folder info
 */
function findMarkdownFiles(dir, baseDir = ROOT_DIR) {
	const files = [];
	const items = fs.readdirSync(dir);

	for (const item of items) {
		const fullPath = path.join(dir, item);
		const stat = fs.statSync(fullPath);

		// Skip node_modules, .git, and hidden directories
		if (stat.isDirectory()) {
			if (item === "node_modules" || item === ".git" || item.startsWith(".")) {
				continue;
			}
			// Recursively search subdirectories
			files.push(...findMarkdownFiles(fullPath, baseDir));
		} else if (stat.isFile() && item.endsWith(".md") && item !== "README.md") {
			const relativePath = path.relative(baseDir, fullPath);
			const folder = path.dirname(relativePath);
			const fileName = path.basename(item, ".md");

			files.push({
				relativePath: relativePath.replace(/\\/g, "/"), // Use forward slashes for markdown links
				folder: folder === "." ? "Uncategorised" : folder,
				fileName: fileName,
				displayName: formatDisplayName(fileName),
			});
		}
	}

	return files;
}

/**
 * Convert filename to display name
 * @param {string} fileName - File name without extension
 * @returns {string} Formatted display name
 */
function formatDisplayName(fileName) {
	return fileName
		.replace(/[-_]/g, " ") // Replace hyphens and underscores with spaces
		.trim();
}

/**
 * Format folder name as heading
 * @param {string} folder - Folder name
 * @returns {string} Formatted heading
 */
function formatFolderName(folder) {
	if (folder === "Uncategorised") return folder;

	return folder
		.split(/[/\\]/)
		.pop() // Get the last folder name if nested
		.replace(/[-_]/g, " ") // Replace hyphens and underscores with spaces
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ")
		.trim();
}

/**
 * Generate the reference documentation section
 * @param {Array} files - Array of file objects
 * @returns {string} Markdown content
 */
function generateDocsSection(files) {
	if (files.length === 0) {
		return "## Reference Documentation\n\nNo reference documents found yet.\n";
	}

	// Group files by folder
	const grouped = files.reduce((acc, file) => {
		if (!acc[file.folder]) {
			acc[file.folder] = [];
		}
		acc[file.folder].push(file);
		return acc;
	}, {});

	// Sort folders alphabetically (but keep Uncategorised first if it exists)
	const folders = Object.keys(grouped).sort((a, b) => {
		if (a === "Uncategorised") return -1;
		if (b === "Uncategorised") return 1;
		return a.localeCompare(b);
	});

	let markdown = "## Reference Documentation\n\n";

	for (const folder of folders) {
		const formattedFolder = formatFolderName(folder);
		markdown += `### ${formattedFolder}\n\n`;

		// Sort files alphabetically
		const sortedFiles = grouped[folder].sort((a, b) =>
			a.displayName.localeCompare(b.displayName),
		);

		for (const file of sortedFiles) {
			markdown += `- [${file.displayName}](${file.relativePath})\n`;
		}

		markdown += "\n";
	}

	return markdown.trim();
}

/**
 * Update the README file with the generated documentation section
 */
function updateReadme() {
	try {
		// Read the current README
		let readmeContent = fs.readFileSync(README_PATH, "utf8");

		// Find all markdown files
		const files = findMarkdownFiles(ROOT_DIR);
		console.log(`Found ${files.length} reference document(s)`);

		// Generate the new documentation section
		const docsSection = generateDocsSection(files);

		// Check if markers exist
		const hasMarkers =
			readmeContent.includes(MARKER_START) &&
			readmeContent.includes(MARKER_END);

		if (hasMarkers) {
			// Replace content between markers
			const regex = new RegExp(`${MARKER_START}[\\s\\S]*?${MARKER_END}`, "g");
			readmeContent = readmeContent.replace(
				regex,
				`${MARKER_START}\n${docsSection}\n${MARKER_END}`,
			);
		} else {
			// Append the section at the end
			readmeContent =
				readmeContent.trim() +
				"\n\n" +
				`${MARKER_START}\n${docsSection}\n${MARKER_END}\n`;
		}

		// Write back to README
		fs.writeFileSync(README_PATH, readmeContent, "utf8");
		console.log("✅ README.md updated successfully!");
	} catch (error) {
		console.error("❌ Error updating README:", error.message);
		process.exit(1);
	}
}

// Run the script
updateReadme();
