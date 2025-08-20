# build_index.py
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter,CharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from dotenv import load_dotenv
# Make sure to set your API key in environment before running:
# export GOOGLE_API_KEY="your-key"
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("Please set the GOOGLE_API_KEY environment variable.")

# Paths
TXT_PATH = "data/constitution_of_pakistan.txt"
INDEX_PATH = "vectorstore/faiss_index"

def build_index():
    # Load text file
    with open(TXT_PATH, "r", encoding="utf-8") as f:
        text = f.read()

    # Split text into chunks
    # text_splitter = RecursiveCharacterTextSplitter(
    #     chunk_size=700,
    #     chunk_overlap=100,
    # )
    text_splitter = CharacterTextSplitter.from_tiktoken_encoder(
    encoding_name="cl100k_base", chunk_size=800, chunk_overlap=100
)
    chunks = text_splitter.split_text(text)

    # Convert chunks to Document objects
    from langchain_core.documents import Document
    documents = [Document(page_content=chunk) for chunk in chunks]

    # Create embeddings
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

    # Create FAISS index
    vectorstore = FAISS.from_documents(documents, embeddings)

    # Save index
    vectorstore.save_local(INDEX_PATH)
    print(f"✅ FAISS index saved at {INDEX_PATH}")

if __name__ == "__main__":
    build_index()
