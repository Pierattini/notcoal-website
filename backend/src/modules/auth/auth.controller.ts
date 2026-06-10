import bcrypt from "bcrypt";
import { Request, Response } from "express";
import prisma from "../../db/prisma";
import {
  AUTH_COOKIE_NAME,
  createSessionToken,
  getCookieValue,
  verifySessionToken,
} from "./session";

const cookieOptions = {
  httpOnly: true,
  sameSite:
    process.env.NODE_ENV === "production"
      ? ("none" as const)
      : ("lax" as const),
  secure: process.env.NODE_ENV === "production",
  maxAge: 1000 * 60 * 60 * 24 * 7,
  path: "/",
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase().trim(),
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = createSessionToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    res.cookie(AUTH_COOKIE_NAME, token, cookieOptions);

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Login failed",
    });
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response
) => {
  const token = getCookieValue(
    req.headers.cookie,
    AUTH_COOKIE_NAME
  );
  const session = verifySessionToken(token);

  if (!session) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  return res.json({
    user: {
      id: session.sub,
      name: session.name,
      email: session.email,
      role: session.role,
    },
  });
};

export const logout = (
  req: Request,
  res: Response
) => {
  res.clearCookie(AUTH_COOKIE_NAME, {
    path: "/",
  });

  return res.json({
    success: true,
  });
};
