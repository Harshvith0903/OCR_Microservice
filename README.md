# OCR Flask App

This project is a Flask-based web application that allows users to upload a PDF file, extract red-highlighted text using Optical Character Recognition (OCR), and download the extracted data as an Excel file. The extracted data includes unique tags and their occurrence counts.

## Features
- Upload a PDF file via a web interface.
- Convert PDF pages to images.
- Detect and extract red-highlighted text using OpenCV and Tesseract OCR.
- Identify and count occurrences of unique uppercase tags.
- Store extracted text and tag counts in an Excel file.
- Auto-adjust column widths in the Excel sheet for better readability.
- Provide a download link for the processed Excel file.

## Technologies Used
- **Flask** - Web framework for handling requests
- **OpenCV** - Image processing for detecting red-highlighted text
- **Tesseract OCR** - Optical Character Recognition for text extraction
- **pandas** - Data handling and processing
- **openpyxl** - Excel file manipulation
- **pdf2image** - Converting PDF to images

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/pdf-ocr-flask.git
   cd pdf-ocr-flask
   ```
2. Create a virtual environment (recommended):
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Ensure Tesseract OCR is installed:
   - **Linux:** `sudo apt install tesseract-ocr`
   - **Windows:** [Download Tesseract OCR](https://github.com/UB-Mannheim/tesseract/wiki)

## Usage

1. Run the Flask application:
   ```sh
   python app.py
   ```
2. Open your browser and go to:
   ```
   http://127.0.0.1:5000/
   ```
3. Upload a PDF file and wait for processing.
4. Click the **Download** button to get the extracted data as an Excel file.

## API Endpoints
- `GET /` - Render the file upload page.
- `POST /` - Handle PDF file upload and start processing.
- `GET /download` - Serve the processed Excel file for download.

## License
This project is licensed under the MIT License.


