import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  // Configurar títulos de documentación
  const options = new DocumentBuilder()
    .setTitle('Bookstore REST API')
    .setDescription('API REST de Bookstore')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);

  const redocOptions: RedocOptions = {
    favicon: 'https://www.ual.es/favicon.ico',
    title: 'API Reservas',
    logo: {
      url: 'https://www.ual.es/application/themes/ual/images/logoual25-300px.png',
      backgroundColor: '#0082B7',
    },
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    noAutoAuth: false,
  };
  // La ruta en que se sirve la documentación
  // SwaggerModule.setup('docs', app, document);
  await RedocModule.setup('/docs', app, document, redocOptions);
  await app.listen(3000);
}
bootstrap();
