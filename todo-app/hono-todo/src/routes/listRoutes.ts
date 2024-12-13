import { zValidator } from "@hono/zod-validator";
import { Hono, type Context } from "hono";
import { idSchema } from "../schemas/userSchema";
import { verifyJwtToken } from "../middlewares/AuthMiddleware";
import { ListRepository } from "../repositories/listRepository";
import { ListService } from "../services/listService";
import { ListController } from "../controllers/listController";
import { listSchema, listUpdateSchema } from "../schemas/listSchema";

const listRepository = new ListRepository();
const listService = new ListService(listRepository);
const listController = new ListController(listService);
const listRoutes = new Hono();

listRoutes.use(verifyJwtToken);

listRoutes.get('/listBoard/:id', async (c: Context) => listController.getListsByBoard(c));

listRoutes.get('/:id', zValidator('param', idSchema), async (c: Context) => listController.getListById(c));

listRoutes.post('/', zValidator('json', listSchema), async (c: Context) => listController.createList(c));

listRoutes.put('/:id', zValidator('param', idSchema), zValidator('json', listUpdateSchema), async (c: Context) => listController.updateList(c));

listRoutes.delete('/:id', zValidator('param', idSchema), async (c: Context) => listController.deleteList(c));

export default listRoutes;