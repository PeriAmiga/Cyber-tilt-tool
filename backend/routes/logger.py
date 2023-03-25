from fastapi import APIRouter, status
from fastapi.responses import ORJSONResponse

logger = APIRouter(
    prefix="/api",
    tags=["Logger"],
    default_response_class=ORJSONResponse
)


@logger.get('/test')
async def test():
    return ORJSONResponse("test", status_code=status.HTTP_200_OK)
