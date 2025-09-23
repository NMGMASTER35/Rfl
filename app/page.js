import ClientApp from './components/ClientApp.js';
import { getQueueSnapshot } from '../lib/queue.js';

export default function Page() {
  const queueSnapshot = getQueueSnapshot();
  return <ClientApp queueSnapshot={queueSnapshot} />;
}
