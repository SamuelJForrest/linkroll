from fastapi import FastAPI

app = FastAPI()


@app.get("/api/")
async def index():
    return {"message": "Welcome to the homepage!"}
