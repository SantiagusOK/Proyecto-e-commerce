from pydantic import BaseModel

from schema.product_schema import *
from schema.category_schema import *

class ProductCategorySchema(BaseModel):
    product:ProductModelSchema
    category:CategorySchema