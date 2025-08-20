from fastapi import APIRouter
from pydantic import BaseModel
from app.services.retriever import retrieve_answer

router = APIRouter()

class QuestionRequest(BaseModel):
    question: str

@router.post("/")
def ask_question(req: QuestionRequest):
    answer = retrieve_answer(req.question)
    return {"question": req.question, "answer": answer}
