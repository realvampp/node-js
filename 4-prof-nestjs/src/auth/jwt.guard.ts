import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'
import { ApiBearerAuth } from '@nestjs/swagger'
import {User} from "../user/entities/user.entity";

@Injectable()
@ApiBearerAuth()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | boolean | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) return true
    return super.canActivate(context)
  }

  handleRequest<TUser extends User>(
    err: Error | null,
    user: TUser,
    info: any,
    context: ExecutionContext,
  ) {
    if (err || !user) {
      throw err || new UnauthorizedException()
    }

    const needAdmin = this.reflector.getAllAndOverride('needAdmin', [
      context.getHandler(),
      context.getClass(),
    ])

    if (needAdmin && !user.isAdmin)
      throw new ForbiddenException('You are not an admin')
    else return user
  }
}
