export default function Footer() {
  return (
    <footer id="contact" className="border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm text-slate-600">
        <div>
          <div className="text-lg font-semibold text-primary">Daily Helper</div>
          <p className="mt-2">Smart Way to Get Work Done.</p>
        </div>
        <div>
          <div className="font-semibold">Contact</div>
          <p>Email: support@dailyhelper.com</p>
          <p>Phone: +91-90000-00000</p>
        </div>
        <div>
          <div className="font-semibold">Links</div>
          <ul className="list-disc ml-5">
            <li>Services</li>
            <li>Tools</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}


