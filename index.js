const repoOwner = 'furuuwu';  // Replace with your GitHub username
const repoName = 't-node';       // Replace with your GitHub repository name

async function fetchFile(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Could not fetch ${url}: ${response.statusText}`);
    }
    return response.text();
}

async function listFiles(path = '') {
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Could not list files in ${path}: ${response.statusText}`);
    }
    const files = await response.json();
    return files;
}

async function searchFiles() {
    const searchInput = document.getElementById('searchInput').value;
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    async function searchInFiles(path = '') {
        try {
            const files = await listFiles(path);

            for (const file of files) {
                if (file.type === 'file') {
                    const contentUrl = file.download_url;
                    const content = await fetchFile(contentUrl);
                    if (content.includes(searchInput)) {
                        const listItem = document.createElement('li');
                        listItem.textContent = file.path;
                        resultsList.appendChild(listItem);
                    }
                } else if (file.type === 'dir') {
                    await searchInFiles(file.path);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    await searchInFiles();
}