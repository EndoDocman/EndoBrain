import os
import json
from pathlib import Path
from docling.document_converter import DocumentConverter

class EndoCompiler:
    """
    EndoBrain Knowledge Compiler.
    Transforms raw PDFs into atomic, linked Obsidian notes.
    """
    def __init__(self, raw_dir="raw", compiled_dir="compiled"):
        self.raw_dir = Path(raw_dir)
        self.compiled_dir = Path(compiled_dir)
        self.compiled_dir.mkdir(exist_ok=True)
        self.converter = DocumentConverter()

    def extract_text(self, pdf_filename):
        """Extracts structured markdown from PDF using Docling."""
        pdf_path = self.raw_dir / pdf_filename
        print(f"[Compiler] Parsing {pdf_filename}...")
        result = self.converter.convert(str(pdf_path))
        return result.document.export_to_markdown()

    def save_note(self, title, content, tags=None):
        """Saves a compiled note into the vault with metadata."""
        filename = title.replace(" ", "_").replace("/", "-") + ".md"
        filepath = self.compiled_dir / filename
        
        # Format Obsidian Metadata
        metadata = "---\n"
        metadata += f"title: {title}\n"
        if tags:
            metadata += f"tags: [{', '.join(tags)}]\n"
        metadata += "---\n\n"
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(metadata + content)
        print(f"[Compiler] Saved Note: {filepath}")

if __name__ == "__main__":
    # Internal CLI for Gemini to call
    pass
