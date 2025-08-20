from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import rag
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Constitution QA")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(rag.router, prefix="/qa", tags=["RAG"])

@app.get("/")
def root():
    return {"message": "Constitution QA API is running 🚀"}
