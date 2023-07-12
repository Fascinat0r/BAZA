import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.auth.base_config import auth_backend, fastapi_users
from app.auth.schemas import UserRead, UserCreate, UserUpdate
from app.ontomodel.component_router import router as router_component
from app.ontomodel.material_router import router as router_material
from app.ontomodel.system_router import router as router_system
from app.page.page_router import router as router_page
app = FastAPI(
    title="BAZA App"
)
app.mount("/static", StaticFiles(directory="C:/Users/Юля/source/repos/BAZA/front/static"), name="static")
origins = [
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Заменить *
    allow_headers=["*"],  # Заменить *
)

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth",
    tags=["Auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["Auth"],
)

app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate, requires_verification=True),
    prefix="/users",
    tags=["users"],
)

app.include_router(router_component)
app.include_router(router_system)
app.include_router(router_page)
app.include_router(router_material)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", reload=True)
