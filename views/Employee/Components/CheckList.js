// import React, { useState } from "react";
// import { FormGroup, Label, Input, Button } from "reactstrap";
// import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
// const Personal = () => {
//   const [form, setForm] = useState({
//     photoIdProof: "",
//     residentialAddress: "",
//     bachelorCertificates: "",
//     passportSizePhoto: "",
//     serviceAgreement: "",
//     MasterCertificates: "",
//   });
//   const handleChange = (e) => {
//     let { id, value } = e.target;
//
//     // setForm((curr) => ({
//     //   ...curr,
//     //   [id]: value,
//     // }));
//   };
//   const validate = () => {
//     let values = Object.values(form).some((prop) => prop === "");
//     return values;
//   };

//   const handleCheckList = (e) => {
//     e.preventDefault();
//     let isValid = validate();
//     if (!isValid) {
//
//     } else {
//       alert("Please enter all fields");
//     }
//   };
//   return (
//     <>
//       <Card>
//         <form onSubmit={handleCheckList}>
//           <CardHeader>
//             <CardTitle tag="h6">CHECKLIST</CardTitle>
//           </CardHeader>
//           <CardBody>
//             <div className="form-row container">
//               <FormGroup className="col-md-4">
//                 <Input
//                   type="checkbox"
//                   name="photoIdProof"
//                   id="photoIdProof"
//                   onChange={handleChange}
//                 />
//                 <Label for="photoIdProof" check>
//                   Photo ID Proof
//                 </Label>
//               </FormGroup>
//               <FormGroup className="col-md-4">
//                 <Input
//                   type="checkbox"
//                   name="residentialAddress"
//                   id="residentialAddress"
//                   onChange={handleChange}
//                 />
//                 <Label for="residentialAddress" check>
//                   Residential Address (Present & Permanent Address)
//                 </Label>
//               </FormGroup>
//               <FormGroup className="col-md-4">
//                 <Input
//                   type="checkbox"
//                   name="residentialAddress"
//                   id="residentialAddress"
//                   onChange={handleChange}
//                 />
//                 <Label for="residentialAddress" check>
//                   Residential Address (Present & Permanent Address)
//                 </Label>
//               </FormGroup>
//               <FormGroup className="col-md-4">
//                 <Input
//                   type="checkbox"
//                   name="residentialAddress"
//                   id="residentialAddress"
//                   onChange={handleChange}
//                 />
//                 <Label for="residentialAddress" check>
//                   Residential Address (Present & Permanent Address)
//                 </Label>
//               </FormGroup>
//               <FormGroup className="col-md-4">
//                 <Input
//                   type="checkbox"
//                   name="residentialAddress"
//                   id="residentialAddress"
//                   onChange={handleChange}
//                 />
//                 <Label for="residentialAddress" check>
//                   Residential Address (Present & Permanent Address)
//                 </Label>
//               </FormGroup>
//               <FormGroup className="col-md-4">
//                 <Input
//                   type="checkbox"
//                   name="residentialAddress"
//                   id="residentialAddress"
//                   onChange={handleChange}
//                 />
//                 <Label for="residentialAddress" check>
//                   Residential Address (Present & Permanent Address)
//                 </Label>
//               </FormGroup>
//               <FormGroup className="col-md-4">
//                 <Input
//                   type="checkbox"
//                   name="residentialAddress"
//                   id="residentialAddress"
//                   onChange={handleChange}
//                 />
//                 <Label for="residentialAddress" check>
//                   Residential Address (Present & Permanent Address)
//                 </Label>
//               </FormGroup>
//               <FormGroup className="col-md-4">
//                 <Input
//                   type="checkbox"
//                   name="residentialAddress"
//                   id="residentialAddress"
//                   onChange={handleChange}
//                 />
//                 <Label for="residentialAddress" check>
//                   Residential Address (Present & Permanent Address)
//                 </Label>
//               </FormGroup>

//               <FormGroup className="col-md-4">
//                 <Button color="primary" className="m-0">
//                   Add
//                 </Button>
//               </FormGroup>
//             </div>
//           </CardBody>
//         </form>
//       </Card>
//     </>
//   );
// };

// export default Personal;
