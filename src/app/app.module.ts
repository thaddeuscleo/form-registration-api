import { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BookingsModule } from 'src/bookings/bookings.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isApolloSandBox = config.get<string>('APOLLO_SANDBOX') === 'true';
        const isPlayground =
          config.get<string>('PLAYGROUND') === 'true' && !isApolloSandBox;
        return {
          uploads: false,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          playground: isPlayground,
          introspection: (config.get<string>('ENVIROMENT') === 'PROD') ? false : true,
          subscriptions: {
            'graphql-ws': true,
          },
        };
      },
    }),
    BookingsModule,
    EventsModule,
  ],
})
export class AppModule {}
