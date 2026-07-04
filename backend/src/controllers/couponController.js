import { Coupon } from '../models/couponModel.js'

export async function validateCoupon(request, response) {
  const { code } = request.body

  if (!code) {
    return response.status(400).json({ message: 'Coupon code is required' })
  }

  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    active: true,
    $or: [
      { expiresAt: { $exists: false } },
      { expiresAt: null },
      { expiresAt: { $gte: new Date() } },
    ],
  })

  if (!coupon) {
    return response.status(404).json({ message: 'Invalid or expired coupon' })
  }

  return response.json({
    coupon: {
      id: coupon.id,
      code: coupon.code,
      discount: coupon.discount,
    },
  })
}
