import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportFromNfceService } from '../services/import-from-nfce.service';

export class ImportFromNfceController {
  handle = async (req: Request, res: Response): Promise<Response> => {
    const service = container.resolve(ImportFromNfceService);

    const result = await service.execute({
      ...req.body,
      userId: req.user!.id,
    });

    return res.status(200).json(result);
  };
}