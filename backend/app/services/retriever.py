import os
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA

load_dotenv()

INDEX_PATH = "vectorstore/faiss_index"

# Load FAISS index + embeddings
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
db = FAISS.load_local(INDEX_PATH, embeddings, allow_dangerous_deserialization=True)

# Setup retriever
retriever = db.as_retriever(search_kwargs={"k": 3})

# Gemini LLM
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.2)

# Define a better prompt
prompt_template = """
You are a legal assistant answering questions strictly from the Constitution of Pakistan. 
Only use the provided context to answer. 
Do not add information that is not in the text. 
If the answer is not present in the constitution, reply:
"I could not find relevant information in the Constitution."

Context:
{context}

Question: {question}

Answer in a clear, precise, legally accurate way and make sure it is properly structured:
"""
prompt = PromptTemplate(
    template=prompt_template,
    input_variables=["context", "question"]
)

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    chain_type="stuff",
    chain_type_kwargs={"prompt": prompt},
    return_source_documents=True  # ✅ add this
)

def retrieve_answer(query: str) -> str:
    response = qa_chain.invoke({"query": query})
    
    # if "source_documents" in response:
    #     print("Retrieved contexts:")
    #     for i, doc in enumerate(response["source_documents"]):
    #         print(f"Context {i+1}:\n{doc.page_content}\n{'-'*40}")
    # else:
    #     print("No contexts found in response.")
    
    return response["result"]

