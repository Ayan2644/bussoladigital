export default function Conta({ user }) {
    return (
      <div className="bg-gray-800 p-6 rounded-xl max-w-xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Minha Conta</h2>
        <p className="text-gray-300 mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-300">
          <strong>ID:</strong> {user.id}
        </p>
      </div>
    );
  }
  