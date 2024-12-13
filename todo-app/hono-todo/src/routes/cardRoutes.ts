import { zValidator } from "@hono/zod-validator";
import { Hono, type Context } from "hono";
import { idSchema } from "../schemas/userSchema";
import { verifyJwtToken } from "../middlewares/AuthMiddleware";
import { CardController } from "../controllers/cardController";
import { cardSchema, cardUpdateSchema } from "../schemas/cardSchema";
import { CardRepository } from "../repositories/cardRepository";
import { CardService } from "../services/cardService";

const cardRepository = new CardRepository();
const cardService = new CardService(cardRepository);
const cardController = new CardController(cardService);
const cardRoutes = new Hono();

cardRoutes.use(verifyJwtToken);

cardRoutes.get('/cardList/:listId', zValidator('param', idSchema), async (c: Context) => cardController.getCardsByList(c));

cardRoutes.get('/:id', zValidator('param', idSchema), async (c: Context) => cardController.getCardById(c));

cardRoutes.post('/', zValidator('json', cardSchema), async (c: Context) => cardController.createCard(c));

cardRoutes.put('/:id', zValidator('param', idSchema), zValidator('json', cardUpdateSchema), async (c: Context) => cardController.updateCard(c));

cardRoutes.delete('/:id', zValidator('param', idSchema), async (c: Context) => cardController.deleteCard(c));

export default cardRoutes;
