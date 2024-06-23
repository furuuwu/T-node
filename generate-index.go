package main

import (
	"fmt"
	"os"
	"path"
	"path/filepath"
	"strings"
	"text/template"
)

const (
	directoryPath = "./docs"
	indexFilePath = "./index.html"
)

func main() {
	// Read files from directory
	files, err := traverseDirectory(directoryPath)
	if err != nil {
		fmt.Println("Error reading directory:", err)
		return
	}

	// Filter files by specific extensions (.js, .md, .mjs)
	allowedExtensions := []string{".js", ".md", ".mjs"}
	filteredFiles := filterFiles(files, allowedExtensions)

	// Generate HTML content for each file
	fileItemsHTML := generateFileItemsHTML(filteredFiles)

	// Update index.html with generated file items
	err = updateIndexFile(fileItemsHTML)
	if err != nil {
		fmt.Println("Error updating index.html:", err)
		return
	}

	fmt.Println("index.html file updated successfully.")
}

// traverseDirectory recursively traverses a directory and returns a slice of file paths
func traverseDirectory(dirPath string) ([]string, error) {
	var files []string

	err := filepath.Walk(dirPath, func(filePath string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() {
			files = append(files, filePath)
		}
		return nil
	})

	if err != nil {
		return nil, err
	}

	return files, nil
}

// filterFiles filters files by allowed extensions
func filterFiles(files []string, allowedExtensions []string) []string {
	var filteredFiles []string

	for _, file := range files {
		ext := strings.ToLower(filepath.Ext(file))
		for _, allowedExt := range allowedExtensions {
			if ext == allowedExt {
				filteredFiles = append(filteredFiles, file)
				break
			}
		}
	}

	return filteredFiles
}

// generateFileItemsHTML generates HTML markup for file items
func generateFileItemsHTML(files []string) string {
	var fileItems []string

	for _, file := range files {
		fileName := path.Base(file)
		content, err := os.ReadFile(file)
		if err != nil {
			fmt.Println("Error reading file:", file, err)
			continue
		}
		fileItem := fmt.Sprintf(`<li class="file-content" data-file-name="%s">
                        <a href="%s" target="_blank">%s</a>
                        <div style="display:none">%s</div>
                    </li>`, fileName, fileName, fileName, content)
		fileItems = append(fileItems, fileItem)
	}

	return strings.Join(fileItems, "\n")
}

// updateIndexFile updates index.html with the provided file items HTML
func updateIndexFile(fileItemsHTML string) error {
	templateData := struct {
		FileItemsHTML string
	}{
		FileItemsHTML: fileItemsHTML,
	}

	tmpl := template.Must(template.New("index").Parse(indexTemplate))

	f, err := os.Create(indexFilePath)
	if err != nil {
		return err
	}
	defer f.Close()

	err = tmpl.Execute(f, templateData)
	if err != nil {
		return err
	}

	return nil
}

// indexTemplate is the HTML template for index.html
const indexTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>T-node</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="wrapper">
    <div class="container">
        <h1>Search Files</h1>
        <div class="search-bar">
            <input type="text" id="searchInput" placeholder="Enter word to search">
        </div>
        <div class="results">
            <h2>Results:</h2>
            <ul id="resultsList">
                <!-- File items will be dynamically generated here -->
                {{.FileItemsHTML}}
            </ul>
        </div>
    </div>
	<div class="main-content">
        <h2>DOCS:</h2>
        <ul>
            <li>
                <h3>npm</h3>
                <ul>
                    <li>
                        <a href="./docs/npm.md" target="_blank" rel="noopener noreferrer">npm.md</a>
                    </li>
                </ul>
            </li>
            <li>
                <h3>CommonJS</h3>
                <ul>
                    <li>
                        <a href="./docs/CommonJS/operations.js" target="_blank"
                            rel="noopener noreferrer">operations.js</a>
                    </li>
                    <li>
                        <a href="./docs/CommonJS/operations.js" target="_blank" rel="noopener noreferrer">sum.js</a>
                    </li>
                </ul>
            </li>
            <li>
                <h3>ES6</h3>
                <ul>
                    <li>
                        <a href="./docs/ES6/operations.mjs" target="_blank" rel="noopener noreferrer">operations.js</a>
                    </li>
                    <li>
                        <a href="./docs/ES6/sum.mjs" target="_blank" rel="noopener noreferrer">sum.js</a>
                    </li>
                </ul>
            </li>
            <li>
                <h3>express</h3>
                <ul>
                    <li>
                        Creating a server ("Express app")
                        <br>
                        <a href="./docs/express/0.js" target="_blank" rel="noopener noreferrer">0.js</a>
                        <br>
                        <a href="./docs/express/0.mjs" target="_blank" rel="noopener noreferrer">0.mjs</a>
                        <br>
                        <a href="./docs/express/0.md" target="_blank" rel="noopener noreferrer">0.md</a>
                        <br>
                        <a href="./docs/express/10.js" target="_blank" rel="noopener noreferrer">10.js</a>
                    </li>
                    <li>
                        Responding to a incoming GET request on the root ('/')
                        <br>
                        <a href="./docs/express/1.js" target="_blank" rel="noopener noreferrer">1.js</a>
                        <br>
                        <a href="./docs/express/1.mjs" target="_blank" rel="noopener noreferrer">1.mjs</a>
                        <br>
                        <a href="./docs/express/1.md" target="_blank" rel="noopener noreferrer">1.md</a>
                    </li>
                    <li>
                        responding to a GET on another route
                        <br>
                        <a href="./docs/express/2.js" target="_blank" rel="noopener noreferrer">2.js</a>
                        <br>
                        <a href="./docs/express/2.mjs" target="_blank" rel="noopener noreferrer">2.mjs</a>
                    </li>
                    <li>
                        Response methods
                        <br>
                        <a href="./docs/express/8.js" target="_blank" rel="noopener noreferrer">8.js</a>
                        <br>
                        <a href="./docs/express/3.mjs" target="_blank" rel="noopener noreferrer">3.js</a>
                        <br>
                        <a href="./docs/express/3.mjs" target="_blank" rel="noopener noreferrer">3.mjs</a>
                        <br>
                        <a href="./docs/express/3.md" target="_blank" rel="noopener noreferrer">3.md</a>
                    </li>
                    <li>
                        Responding to a POST with a JSON body by manually parsing the JSON
                        <br>
                        <a href="./docs/express/4.js" target="_blank" rel="noopener noreferrer">4.js</a>
                        <br>
                        <a href="./docs/express/4.mjs" target="_blank" rel="noopener noreferrer">4.mjs</a>
                        <br>
                        <a href="./docs/express/4.md" target="_blank" rel="noopener noreferrer">4.md</a>
                    </li>
                    <li>
                        Responding to a POST with a JSON body by using a middleware to parse the JSON
                        <br>
                        <a href="./docs/express/5.js" target="_blank" rel="noopener noreferrer">5.js</a>
                        <br>
                        <a href="./docs/express/5.mjs" target="_blank" rel="noopener noreferrer">5.mjs</a>
                        <br>
                        <a href="./docs/express/5.md" target="_blank" rel="noopener noreferrer">5.md</a>
                    </li>
                    <li>
                        Responding to PUT (with a JSON body)
                        <br>
                        <a href="./docs/express/6.js" target="_blank" rel="noopener noreferrer">6.js</a>
                        <br>
                        <a href="./docs/express/6.mjs" target="_blank" rel="noopener noreferrer">6.mjs</a>
                    </li>
                    <li>
                        Reponse to a DELETE
                        <br>
                        <a href="./docs/express/7.js" target="_blank" rel="noopener noreferrer">7.js</a>
                        <br>
                        <a href="./docs/express/7.mjs" target="_blank" rel="noopener noreferrer">7.mjs</a>
                    </li>
                    <li>
                        Routing with express.Router
                        <br>
                        <a href="./docs/express/9.js" target="_blank" rel="noopener noreferrer">9.js</a>
                    </li>
                    <li>
                        Parsing request bodies
                        <br>
                        <a href="./docs/express/11.js" target="_blank" rel="noopener noreferrer">11.js</a>
                        <br>
                        <a href="./docs/express/11.md" target="_blank" rel="noopener noreferrer">11.md</a>
                    </li>
                    <li>
                        Serving static files
                        <br>
                        <a href="./docs/express/12.js" target="_blank" rel="noopener noreferrer">12.js</a>
                    </li>
                    <li>
                        Server-side rendering with EJS
                        <br>
                        <a href="./docs/express/13.js" target="_blank" rel="noopener noreferrer">13.js</a>
                        <br>
                        <a href="./docs/express/13.md" target="_blank" rel="noopener noreferrer">13.md</a>
                    </li>
                    <li>
                        Server-side rendering with express-handlebars
                        <br>
                        <a href="./docs/express/14.js" target="_blank" rel="noopener noreferrer">14.js</a>
                    </li>
                    <li>
                        Cookies with cookie-parser
                        <br>
                        <a href="./docs/express/15.js" target="_blank" rel="noopener noreferrer">15.js</a>
                        <br>
                        <a href="./docs/express/15.md" target="_blank" rel="noopener noreferrer">15.md</a>
                    </li>
                    <li>
                        Cookies with cookie-parser, signed version
                        <br>
                        <a href="./docs/express/16.js" target="_blank" rel="noopener noreferrer">16.js</a>
                    </li>
                </ul>
            </li>
            <li>
                <h3>http</h3>
                <ul>
                    <li>
                        <a href="./docs/http/0.mjs" target="_blank" rel="noopener noreferrer">0.mjs</a>
                    </li>
                    <li>
                        <a href="./docs/http/1.mjs" target="_blank" rel="noopener noreferrer">1.mjs</a>
                    </li>
                    <li>
                        <a href="./docs/http/2.mjs" target="_blank" rel="noopener noreferrer">2.mjs</a>
                    </li>
                    <li>
                        <a href="./docs/http/3.mjs" target="_blank" rel="noopener noreferrer">3.mjs</a>
                    </li>
                    <li>
                        <a href="./docs/http/4.mjs" target="_blank" rel="noopener noreferrer">4.mjs</a>
                    </li>
                </ul>
            </li>
            <li>
                <h3>mysql2</h3>
                <ul>
                    <li>
                        <a href="./docs/mysql2/0.mjs" target="_blank" rel="noopener noreferrer">0.mjs</a>
                        <br>
                        <a href="./docs/mysql2/0.md" target="_blank" rel="noopener noreferrer">0.md</a>
                    </li>
                    <li>
                        <a href="./docs/mysql2/1.mjs" target="_blank" rel="noopener noreferrer">1.mjs</a>
                    </li>
                    <li>
                        <a href="./docs/mysql2/2.mjs" target="_blank" rel="noopener noreferrer">2.mjs</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
	</div>
    <script src="index.js"></script>
</body>
</html>`
