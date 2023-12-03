import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productsRouter = createTRPCRouter({
  createProduct: publicProcedure
    .input(
      z.object({
        name: z.string().trim(),
        description: z.string().trim(),
        image_url: z.string(),
        quantity: z.string().trim(),
        price: z.string().trim(),
        token_address: z.string().optional(),
        size: z.string().trim(),
        category: z.string().trim(),
        brand: z.string().trim(),
        ownerId: z.string(),
        projectId: z.string().trim().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newProduct = await ctx.db.product.create({
        data: input,
      });

      return newProduct;
    }),

  getProductById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // Fetch a products by ID from the database using Prisma
      const product = await ctx.db.product.findUnique({
        where: { id: input.id },
      });

      if (!product) {
        throw new Error("No existe el artículo");
      }

      return product;
    }),

  getUserProducts: publicProcedure
    .input(z.object({ ownerId: z.string() }))
    .query(async ({ ctx, input }) => {
      const products = await ctx.db.product.findMany({
        where: { ownerId: input.ownerId },
      });

      return products;
    }),

  updateProductById: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          name: z.string().trim().optional(),
          description: z.string().trim().optional(),
          image_url: z.string().optional(),
          quantity: z.string().trim().optional(),
          price: z.string().trim().optional(),
          token_address: z.string().optional(),
          size: z.string().trim().optional(),
          category: z.string().trim().optional(),
          brand: z.string().trim().optional(),
          projectId: z.string().trim().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Update a product in the database using Prisma
      const updatedProduct = await ctx.db.product.update({
        where: { id: input.id },
        data: input.data,
      });

      return updatedProduct;
    }),

  deleteProductById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Delete a product from the database using Prisma
      const deletedProduct = ctx.db.product.delete({
        where: { id: input.id },
      });

      return deletedProduct;
    }),

  getAllProducts: publicProcedure.query(async ({ ctx }) => {
    // Fetch all products from the database using Prisma
    const products = ctx.db.product.findMany();
    return products;
  }),
});
