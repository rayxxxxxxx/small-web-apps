from flask import (
    Blueprint,
    make_response,
    url_for,
    request
)

from .schemas import Post as PostSchema
from .models import Post as PostModel

router = Blueprint('posts', __name__, url_prefix='/posts')


@router.get('/<post_id>')
def post(post_id):
    postdata = PostModel.as_dict(PostModel.get_by_id(post_id))
    return postdata
