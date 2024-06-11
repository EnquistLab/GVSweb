const fs = require('fs');
const path = require('path');

// This is the path to the 'out' directory where Next.js exports the static files
const exportDir = path.join(__dirname, 'out');

// Read all files in the export directory
fs.readdir(exportDir, (err, files) => {
    if (err) {
        console.error('Error reading the export directory:', err);
        return;
    }

    // Filter out the non-HTML files and the 'index.html' file
    const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'index.html');

    // Process each HTML file
    htmlFiles.forEach(file => {
        const oldPath = path.join(exportDir, file);
        const dirName = file.replace('.html', '');
        const dirPath = path.join(exportDir, dirName);

        // Create a directory named after the HTML file
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        // Move and rename the HTML file to 'index.html' within its new directory
        const newPath = path.join(dirPath, 'index.html');
        fs.rename(oldPath, newPath, err => {
            if (err) {
                console.error(`Error moving ${file}:`, err);
            } else {
                console.log(`Moved ${file} to ${newPath}`);
            }
        });
    });
});
