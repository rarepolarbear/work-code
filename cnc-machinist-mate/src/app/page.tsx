import GCodeGenerator from '@/components/GCodeGenerator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-green-800 text-white p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold">CNC Machinist Mate</h1>
        <p className="text-xl text-gray-300 mt-2">Your assistant for CNC programming tasks</p>
      </header>
      <GCodeGenerator />
    </main>
  );
}
}
