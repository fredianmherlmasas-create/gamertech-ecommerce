import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { asyncHandler } from '../middleware/errorHandler';
import { ApiResponse, CreateUserInput, LoginInput } from '../types';

export class AuthController {
  // POST /api/auth/register
  static register = asyncHandler(async (req: Request, res: Response) => {
    const input: CreateUserInput = req.body;
    const result = await AuthService.register(input);

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    res.status(201).json(response);
  });

  // POST /api/auth/login
  static login = asyncHandler(async (req: Request, res: Response) => {
    const input: LoginInput = req.body;
    const result = await AuthService.login(input);

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    res.status(200).json(response);
  });

  // GET /api/auth/profile
  static getProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const profile = await AuthService.getProfile(userId);

    const response: ApiResponse<typeof profile> = {
      success: true,
      data: profile,
    };

    res.status(200).json(response);
  });

  // PATCH /api/auth/profile
  static updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { firstName, lastName, email } = req.body;
    const profile = await AuthService.updateProfile(userId, {
      firstName,
      lastName,
      email,
    });

    const response: ApiResponse<typeof profile> = {
      success: true,
      data: profile,
    };

    res.status(200).json(response);
  });

  // POST /api/auth/change-password
  static changePassword = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { currentPassword, newPassword } = req.body;
    const result = await AuthService.changePassword(
      userId,
      currentPassword,
      newPassword
    );

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
    };

    res.status(200).json(response);
  });
}
