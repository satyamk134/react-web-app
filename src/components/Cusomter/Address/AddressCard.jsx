import * as React from 'react';
export default function AddressCard({address}) {
  return (
        <div>
            <p>
                {address.firstName} {address.lastName}<br></br>
                {address.address}<br></br>
                {address.city} - {address.pincode}<br></br>
                {address.country}<br></br>
                Mobile No- {address.mobileNumber}
            </p>
        </div>
  );
}
