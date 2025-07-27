"use client";

import { useAlert } from "@/lib/alert-context";
import { useState } from "react";
import BaseAlert from "@/components/ui/base-alert";
import Toast from "@/components/ui/toast";

export default function TestAlertPage() {
  const { showAlert } = useAlert();
  const [showBaseAlert, setShowBaseAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Test Alert System</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AlertContext Test */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">AlertContext Test</h2>
          <div className="space-y-2">
            <button
              onClick={() => showAlert("Ini adalah pesan sukses!", "success")}
              className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Success Alert
            </button>
            <button
              onClick={() => showAlert("Ini adalah pesan error!", "error")}
              className="w-full p-3 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Error Alert
            </button>
            <button
              onClick={() => showAlert("Ini adalah pesan warning!", "warning")}
              className="w-full p-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Warning Alert
            </button>
            <button
              onClick={() => showAlert("Ini adalah pesan info!", "info")}
              className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Info Alert
            </button>
          </div>
        </div>

        {/* BaseAlert Test */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">BaseAlert Test</h2>
          <button
            onClick={() => setShowBaseAlert(!showBaseAlert)}
            className="w-full p-3 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Toggle BaseAlert
          </button>
          
          {showBaseAlert && (
            <BaseAlert
              type="error"
              message="Kamu belum login - BaseAlert Test"
              show={showBaseAlert}
              onClose={() => setShowBaseAlert(false)}
              autoClose={true}
              duration={5000}
            />
          )}
        </div>

        {/* Toast Test */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Toast Test</h2>
          <button
            onClick={() => setShowToast(!showToast)}
            className="w-full p-3 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Toggle Toast
          </button>
          
          {showToast && (
            <Toast
              type="success"
              title="Berhasil!"
              message="Ini adalah contoh toast notification"
              show={showToast}
              onClose={() => setShowToast(false)}
              autoClose={true}
              duration={5000}
              position="top-right"
            />
          )}
        </div>

        {/* Middleware Test */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Middleware Test</h2>
          <p className="text-sm text-gray-600 mb-4">
            Coba akses halaman yang dilindungi tanpa login untuk melihat alert error
          </p>
          <a
            href="/user/home"
            className="block w-full p-3 bg-red-500 text-white rounded hover:bg-red-600 text-center"
          >
            Akses Halaman User (Tanpa Login)
          </a>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Cara Kerja:</h3>
        <ul className="text-sm space-y-1">
          <li>• <strong>AlertContext:</strong> Menggunakan React Context untuk state management global</li>
          <li>• <strong>BaseAlert:</strong> Komponen alert sederhana dengan styling yang clean</li>
          <li>• <strong>Toast:</strong> Komponen toast dengan animasi dan progress bar</li>
          <li>• <strong>Middleware:</strong> Otomatis menampilkan error alert ketika user belum login</li>
        </ul>
      </div>
    </div>
  );
} 