import { Hono, type Context } from "hono";
import { RoleController } from "../controllers/roleController";
import { RoleService } from "../services/roleService";
import { RoleRepository } from "../repositories/roleRepository";
import { verifyJwtToken, verifyRole } from "../middlewares/AuthMiddleware";
import { zValidator } from "@hono/zod-validator";
import { idSchema } from "../schemas/userSchema";
import { roleSchema, roleUpdateSchema } from "../schemas/roleSchema";

const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

const roleRoutes = new Hono();

roleRoutes.use(verifyJwtToken);
roleRoutes.use(verifyRole);

roleRoutes.get('/', async (c: Context) => roleController.getRoles(c));

roleRoutes.get('/:id', zValidator('param', idSchema), async (c: Context) => roleController.getRoleById(c));

roleRoutes.post('/', zValidator('json', roleSchema), async (c: Context) => roleController.createRole(c));

roleRoutes.put('/:id', zValidator('param', idSchema), zValidator('json', roleUpdateSchema), async (c: Context) => roleController.updateRole(c));

roleRoutes.delete('/:id', zValidator('param', idSchema), async (c: Context) => roleController.deleteRole(c));

export default roleRoutes;
