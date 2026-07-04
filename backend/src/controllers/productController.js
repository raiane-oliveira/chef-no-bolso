import { Product } from '../models/productModel.js'

export async function listProducts(request, response) {
  const { search, category, featured, bestSellers, page = 1, limit = 20 } = request.query

  const filter = {}

  if (search) {
    filter.name = { $regex: search, $options: 'i' }
  }

  if (category) {
    filter.category = category
  }

  if (featured === 'true') {
    filter.featured = true
  }

  const skip = (Number(page) - 1) * Number(limit)
  let sort = { createdAt: -1 }

  if (bestSellers === 'true') {
    sort = { createdAt: -1 }
  }

  const [products, total] = await Promise.all([
    Product.find(filter).sort(sort).skip(skip).limit(Number(limit)).populate('category', 'name'),
    Product.countDocuments(filter),
  ])

  return response.json({
    products,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
  })
}

export async function getProductById(request, response) {
  const { id } = request.params

  const product = await Product.findById(id).populate('category', 'name')

  if (!product) {
    return response.status(404).json({ message: 'Product not found' })
  }

  return response.json({ product })
}

export async function createProduct(request, response) {
  const { name, description, price, imageUrl, category, featured } = request.body

  if (!name || !description || !price || !imageUrl || !category) {
    return response.status(400).json({ message: 'Name, description, price, imageUrl and category are required' })
  }

  const product = await Product.create({
    name,
    description,
    price,
    imageUrl,
    category,
    featured: featured || false,
  })

  return response.status(201).json({ product })
}

export async function updateProduct(request, response) {
  const { id } = request.params
  const { name, description, price, imageUrl, category, featured } = request.body

  const product = await Product.findById(id)

  if (!product) {
    return response.status(404).json({ message: 'Product not found' })
  }

  if (name) product.name = name
  if (description) product.description = description
  if (price !== undefined) product.price = price
  if (imageUrl) product.imageUrl = imageUrl
  if (category) product.category = category
  if (featured !== undefined) product.featured = featured

  await product.save()

  return response.json({ product })
}

export async function deleteProduct(request, response) {
  const { id } = request.params

  const product = await Product.findById(id)

  if (!product) {
    return response.status(404).json({ message: 'Product not found' })
  }

  await Product.findByIdAndDelete(id)

  return response.status(204).send()
}
