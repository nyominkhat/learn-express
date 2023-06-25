import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    if (products.length === 0) {
      return res.status(404).json("There are no products!");
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!product) {
      return res.status(200).json("There is no product!");
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const createdProduct = await prisma.product.create({
      data: {
        name,
        price,
      },
    });

    return res.status(201).json(createdProduct);
  } catch (error) {
    return res.status(500).end();
  }
};

export const updateProduct = async (req, res) => {
  const { name, price } = req.body;
  const id = req.params.id;

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        price,
      },
    });

    return res.status(201).json(updatedProduct);
  } catch (error) {
    return res.status(500).end();
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({ message: "Product have been deleted!" });
  } catch (error) {
    return res.status(500).end();
  }
};
