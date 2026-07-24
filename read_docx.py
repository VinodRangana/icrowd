import zipfile
import xml.etree.ElementTree as ET
import sys

def extract_text_from_docx(docx_path):
    try:
        with zipfile.ZipFile(docx_path) as docx:
            xml_content = docx.read('word/document.xml')
            tree = ET.XML(xml_content)
            NAMESPACE = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
            paragraphs = []
            for paragraph in tree.iter(NAMESPACE + 'p'):
                texts = [node.text for node in paragraph.iter(NAMESPACE + 't') if node.text]
                if texts:
                    paragraphs.append(''.join(texts))
            return '\n'.join(paragraphs)
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    path = sys.argv[1]
    out_path = sys.argv[2]
    text = extract_text_from_docx(path)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(text)
