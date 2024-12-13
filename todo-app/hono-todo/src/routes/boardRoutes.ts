import { zValidator } from "@hono/zod-validator";
import { Hono, type Context } from "hono";
import { idSchema } from "../schemas/userSchema";
import { verifyJwtToken } from "../middlewares/AuthMiddleware";
import { BoardRepository } from "../repositories/boardRepository";
import { BoardService } from "../services/boardService";
import { BoardController } from "../controllers/boardController";
import { boardSchema, boardUpdateSchema } from "../schemas/boardSchema";

const boardRepository = new BoardRepository();
const boardService = new BoardService(boardRepository);
const boardController = new BoardController(boardService);
const boardRoutes = new Hono();

boardRoutes.use(verifyJwtToken);

boardRoutes.get('/', async (c: Context) => boardController.getBoardsByUser(c));

boardRoutes.get('/:id', zValidator('param', idSchema), async (c: Context) => boardController.getBoardById(c));

boardRoutes.post('/', zValidator('json', boardSchema), async (c: Context) => boardController.createBoard(c));

boardRoutes.put('/:id', zValidator('param', idSchema), zValidator('json', boardUpdateSchema), async (c: Context) => boardController.updateBoard(c));

boardRoutes.delete('/:id', zValidator('param', idSchema), async (c: Context) => boardController.deleteBoard(c));

export default boardRoutes;