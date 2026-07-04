import { Category } from '../models/categoryModel.js'

export async function listCategories(_request, response) {
  const categories = await Category.find().sort({ name: 1 })

  return response.json({ categories })
}
