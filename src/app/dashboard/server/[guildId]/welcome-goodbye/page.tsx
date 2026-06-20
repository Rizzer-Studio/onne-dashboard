import { PageHeader } from '@/components/AppShell';
import { WelcomeGoodbyeSettings } from '@/components/message-builder/MessageBuilder';

export default function ServerWelcomeGoodbyePage() {
  return <>
    <PageHeader title="Mensagens de Entrada/Saída" description="Configure mensagens automáticas com o Editor de Mensagens universal do Onne." />
    <WelcomeGoodbyeSettings />
  </>;
}
