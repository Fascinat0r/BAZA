from fastapi import Request, APIRouter
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="front/templates")
router = APIRouter(
    tags=["Pages"]
)


@router.get("/viewing", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse("viewing.html", {"request": request})


@router.get("/viewing/", response_class=HTMLResponse)
async def read_item(request: Request, id: str):
    return templates.TemplateResponse("viewing.html", {"request": request, "id": id})


@router.get("/material", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse("material.html", {"request": request})


@router.get("/sign-in", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse("sign-in.html", {"request": request})