# Secure Coding
***
## Imra Kočiš
***

***Software Engineering,*** 
***Algebra University College,***
***June 2024***

***

### ***Content***

***
### Learning Outcome 1

#### Task
Use tools OWASP ZAP and Burp Suite to scan your application
for vulnerabilities. Choose three most significant vulnerabilities, document them, fix
them and re-scan the application to prove that the vulnerabilities are fixed.

#### Solution

##### OWASP ZAP
![zap-1](project-images/zap-1.png)

We have some medium risks, mostly regarding `CSP` (Content Security Policy).

Since this application is written in `Next.js v13.4.15`, we need to handle our headers 
almost from scratch.

If we follow official Next.js documentation we must set up middleware 
to handle all requests in our application, and still we are getting potential risks with 
CSP.

```javascript
import { NextResponse } from "next/server";

export function middleware(request) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: http: 'unsafe-inline' ${
      process.env.NODE_ENV === "production" ? "" : `'unsafe-eval'`
    };
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );

  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
```

But at the end of the documentation page there is an easy and most optimal solution 
that Next.js offers and that is simply updating Next.js framework to version `13.4.20`
or any newest. In our case we will update to the latest version `14.2.4`.

We can easily update our Next.js version by running the following command: 

```bash
yarn remove next
yarn add next@14.2.4
# or
yarn add next # which will install the latest version
```

Also, there is a Missing `Anti-clickjacking Header`. This is easily fixable with 
adding one header to our `next.config.js` file

```javascript
const securityHeaders = [
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
    },
]
const nextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ]
    }
};

export default nextConfig;
```

After fixing these issues, we can re-scan our application with OWASP ZAP tool.

![zap-2](project-images/zap-2.png)

##### Burp Suite

***

### Learning Outcome 2

#### Task

Use SonarQube tool and scan your application for the bugs.
Choose three most significant bugs, document them, fix them and re-scan the
application to prove that the bugs are fixed.

#### Solution

![sonarqube-1](project-images/sonar-qube-1.png)


After performed scans we can see that we have one high reliability issue, and 
one medium Our biggest issue comes from `CSS: linear-gradient` was standardized 
with `CSS3`. Before that, it was possible to use different non-standard values to 
define the gradient’s direction.

Because these values are not standard, they are not  supported in all browsers,
and therefore they should no longer be used to get the 
expected gradient in the latest browser versions that support CSS3. This rule raises
an issue when the first parameter of a linear-gradient is not a valid `<side-or-corner>` 
or angle.

![sonarqube-2](project-images/sonar-qube-2.png)

We can fix this issue by changing the `linear-gradient` value to a valid one.

```css
/*from*/
background: -webkit-linear-gradient(to right, #606263, #252626);
/*to*/
background: -webkit-linear-gradient(right, #606263, #252626);
```

Second issue was bug that handles user data:

![sonarqube-3](project-images/sonar-qube-3.png)

We can fix this issue by adding correct return statement

```typescript
export const handleUserProfileName = (
  fullName?: string | null,
  firstName?: string | null,
  lastName?: string | null,
): string => {
  if (fullName) {
    const names = fullName.split(" ");
    return `${names[0][0]}${names[1][0]}`;
  }
  if (firstName && lastName) return `${firstName[0]}${lastName[0]}`;
  else if (firstName) return `${firstName[0]}`;
  else if (lastName) return `${lastName[0]}`;
  return "";
};
```

Third most significant issue with our code is non-usage of authentication 
session in out server action:

![sonarqube-4](project-images/sonar-qube-4.png)

We can fix this by removing unused `session` parameter from our server action.


```typescript
export async function getAllUsersAndTanks(): Promise<User[]> {
    const response = await fetch(`${process.env.API_BASE_URL}/user`);

    if (!response.ok) return [];
    return await response.json();
}
```

After fixing these issues, we can re-scan our application with SonarQube tool.

![sonarqube-5](project-images/sonar-qube-5.png)

***

### Learning Outcome 3

#### Task 
implement a JWT access and refresh token in your web
application and document the example of token usage.

#### Solution

First, we must create authentication logic on backend application, for backend we 
are using NestJs, modern Typescript backend framework, alongside Primsa ORM and 
Postgres database.

Let’s assume that we are familiar with syntax of NestJs and Primsa, and that we have
already created user modal.

We will create `auth.service.ts` with `AuthService` as `injectable` service.
There will be five functions that will handle authentication logic.

```typescript
@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) {}

    async signupLocal(dto: AuthDto): Promise<Tokens> {
        const hash = await argon.hash(dto.password);

        const user = await this.prisma.user
            .create({
                data: {
                    email: dto.email,
                    hash,
                },
            })
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException('Credentials incorrect');
                    }
                }
                throw error;
            });

        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }

    async signinLocal(dto: AuthDto): Promise<Tokens> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) throw new ForbiddenException('Access Denied');

        const passwordMatches = await argon.verify(user.hash, dto.password);
        if (!passwordMatches) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }

    async logout(userId: number): Promise<boolean> {
        await this.prisma.user.updateMany({
            where: {
                id: userId,
                hashedRt: {
                    not: null,
                },
            },
            data: {
                hashedRt: null,
            },
        });
        return true;
    }

    async refreshTokens(userId: number, rt: string): Promise<Tokens> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

        const rtMatches = await argon.verify(user.hashedRt, rt);
        if (!rtMatches) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }

    async updateRtHash(userId: number, rt: string): Promise<void> {
        const hash = await argon.hash(rt);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRt: hash,
            },
        });
    }

    async getTokens(userId: number, email: string): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: userId,
            email: email,
        };

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get<string>('AT_SECRET'),
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get<string>('RT_SECRET'),
                expiresIn: '7d',
            }),
        ]);

        return {
            access_token: at,
            refresh_token: rt,
            id: userId,
        };
    }
}
```

After creating `auth.service.ts` we must create `auth.controller.ts` that will handle 
requests from frontend application.

```typescript
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    console.log('local/signin');
    return this.authService.signinLocal(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    console.log('refresh');
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
```

After creating `auth.controller.ts` we must create `at.guard.ts` and `rt.guard.ts`
that will handle access and refresh token logic.


`at.guard.ts`
```typescript
@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }
}
```

`rt.guard.ts`
```typescript
export class RtGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
```

Finally, we must modify `app.module.ts` that will handle all request with new
authentication logic.

```typescript
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
```