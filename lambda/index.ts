import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { Strava } from 'strava';

interface ShortcutBody {
  weight?: number
}

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;

const strava = new Strava({
  client_id: clientId,
  client_secret: clientSecret,
  refresh_token: refreshToken,
});

export const handler = async function handler({ body }: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  try {
    if (!body) {
      throw new Error('Missing body');
    } else {
      const { weight = 0 } = JSON.parse(body) as ShortcutBody;
      const athlete = await strava.athletes.updateLoggedInAthlete({ weight });

      console.log(athlete);

      return 'Success';
    }
  } catch {
      return 'Error';
  }
}
