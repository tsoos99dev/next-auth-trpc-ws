import Nav from './nav';
import SecretView from './secret';

export default function Home() {
  return (
    <div className='h-screen flex flex-col'>
      <Nav />
      <div className='flex flex-1 items-center justify-center'>
        <SecretView />
      </div>
    </div>
  );
}
