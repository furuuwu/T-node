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
	templatePath  = "./base_index.html" // Path to the external template file
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

	/*
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
	*/
	templateData := struct {
		FileItemsHTML string
	}{
		FileItemsHTML: fileItemsHTML,
	}

	tmpl, err := template.ParseFiles(templatePath)
	if err != nil {
		return err
	}

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
