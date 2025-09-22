import './Registration.css'
import qrPay1 from '../assets/qrcodepay1.jpg'
import qrPay2 from '../assets/qrcodepay2.jpg'

const Registration = () => {
  const formEmbedUrl = 'https://docs.google.com/forms/d/1CuyZH7zmGI_n5zu31h59qqRU8yB0NzjX4hnnu3cpKYk/viewform?embedded=true'

  return (
    <div className="registration">
      <section className="register-hero">
        <div className="container">
          <h1 className="page-title animate-slide-up">Registration</h1>
          <p className="page-subtitle animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Fill the official INTELINFO 2k25 Google Form to register.
          </p>
        </div>
      </section>

      <section className="register-content section">
        <div className="container">
          <div className="google-form-embed glass-card">
            <div className="responsive-iframe-wrapper">
              <iframe
                src={formEmbedUrl}
                title="INTELINFO 2k25 Registration Form"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                loading="lazy"
                allowFullScreen
              >
                Loading…
              </iframe>
            </div>
            <div className="form-note">
              If the form doesn't load, open it in a new tab:
              {' '}<a className="external-link" href="https://docs.google.com/forms/d/1CuyZH7zmGI_n5zu31h59qqRU8yB0NzjX4hnnu3cpKYk/viewform" target="_blank" rel="noopener noreferrer">Open Google Form</a>
            </div>
          </div>

          <div className="qr-grid">
            <div className="qr-card glass-card">
              <h3 className="qr-title">Pay 1 QR</h3>
              <img src={qrPay1} alt="Pay 1 QR Code" className="qr-image" loading="lazy" />
              <a href={qrPay1} download="INTELINFO-Pay-1-QR.jpg" className="qr-download">Download Pay 1 QR</a>
            </div>
            <div className="qr-card glass-card">
              <h3 className="qr-title">Pay 2 QR</h3>
              <img src={qrPay2} alt="Pay 2 QR Code" className="qr-image" loading="lazy" />
              <a href={qrPay2} download="INTELINFO-Pay-2-QR.jpg" className="qr-download">Download Pay 2 QR</a>
            </div>
          </div>
        
        <div className="payment-note">
          Please complete the payment before registration for the Transaction ID. Always use <strong>Pay 1</strong> instead of <strong>Pay 2</strong>.
          <em> (Pay 2 is only when Pay 1 results in Transaction Error or Server Error)</em>
        </div>
        </div>
      </section>
    </div>
  )
}

export default Registration
