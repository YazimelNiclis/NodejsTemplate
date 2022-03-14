import { Communication, Singleton } from 'api-cidi';
import { familiesGroupsService } from 'api-cidi/lib/services';

export const configCidi = () => {
  Singleton.getInstance().config(+process.env.ID_APP, true, process.env.CIDI_KEY, process.env.CIDI_PASS, null, null, null, null, false);
  Communication.config();
  familiesGroupsService.config();
};
