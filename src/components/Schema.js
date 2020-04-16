import * as Yup from 'yup'
export const RegisterSchema = Yup.object({
    firstname: Yup.string()
        .required('กรุณากรอกชื่อ')
        .max(50, 'ชื่อยาวเกินไป'),
    lastname: Yup.string()
        .required('กรุณากรอกนามสกุล')
        .max(50, 'นามสกุลยาวเกินไป'),
    citizenID: Yup.string()
        .length(13, 'หมายเลขบัตรประชาชนไม่ถูกต้อง')
        .required('กรุณากรอกหมายเลขบัตรประชาชน')
        .test('', 'กรุณาใส่ตัวเลข', function(value) {
            //check citizenId pattern
            return /\d+/.test(value)
        }),
    birthdate: Yup.date()
        .default(() => new Date())  
        .max(new Date(), 'date errors'),
    tel: Yup.string()
        .required('กรุณากรอกหมายเลขโทรศัพท์')
        .length(10, 'หมายเลขโทรศัพท์ไม่ถูกต้อง')
        .test('', '', function(value) {
            //check citizenId pattern
            return /\d+/.test(value)
        }),
    email: Yup.string()
        // .required('กรุณากรอกอีเมลล์')
        .email('อีเมลล์ไม่ถูกต้อง'),
    address: Yup.string()
        .required('กรุณากรอกที่อยู่'),
    subdistrict: Yup.string()
        .required('กรุณากรอกแขวง/ตำบล'),
    district: Yup.string()
        .required('กรุณากรอกเขต/อำเภอ'),
    zipcode: Yup.string()
        .length(5, 'รหัสไปรษณีย์ไม่ถูกต้อง')
        .required('กรุณากรอกรหัสไปรษณีย์')
        .test('', 'กรุณาใส่ตัวเลข', function(value) {
            //check citizenId pattern
            return /\d+/.test(value)
        }),
    username: Yup.string()
        .required('กรุณากรอกชื่อบัญชีผู้ใช้')
        .min(4, 'กรุณากรอกอย่างน้อย 4 ตัวอักษร'),
    password: Yup.string()
        .required('กรุณากรอกรหัสผ่าน')
        .min(4, 'รหัสผ่านต้องมีอย่างน้อย 4 ตัว'),
    confirmPassword: Yup.string()
        .required('กรุณากรอกรหัสผ่านยืนยัน')
        //check password match
        .test('passwords-match', 'รหัสผ่านไม่ตรงกัน', function (value) {
            return this.parent.password === value;
        }),
    });

export const MiddlemanSchema = RegisterSchema.shape({ cert: Yup.string().required('กรุณาใส่เลขใบอนุญาต') })

export const GardenSchema = Yup.object({
    area: Yup.number()
        .required('กรุณากรอกเนื้อที่สวนยาง')
        .positive('เนื้อที่ไม่ถูกต้อง')
        .moreThan(0, 'เนื้อที่ไม่ถูกต้อง'),
    startYear: Yup.number()
        .required('กรุณากรอกปีที่ปลูก')
        .positive('ปีไม่ถูกต้อง')
        .moreThan(0, 'ปีไม่ถูกต้อง')
        .min((new Date().getUTCFullYear() + 543 - 50), 'ปีไม่ถูกต้อง')
        .max((new Date().getUTCFullYear() + 543), 'ปีไม่ถูกต้อง'),
    species: Yup.string()
        .required('กรุณากรอกชื่อพันธุ์ยาง'),
    amount: Yup.number()
        .required('กรุณากรอกจำนวนต้นยาง')
        .moreThan(0, 'จำนวนต้นยางไม่ถูกต้อง'),
})

export const GardenerSchema = MiddlemanSchema.shape({
    garden: Yup.array().of( GardenSchema.shape({
        address: Yup.string()
        .required('กรุณากรอกที่อยู่'),
    subdistrict: Yup.string()
        .required('กรุณากรอกแขวง/ตำบล'),
    district: Yup.string()
        .required('กรุณากรอกเขต/อำเภอ'),
    zipcode: Yup.string()
        .length(5, 'รหัสไปรษณีย์ไม่ถูกต้อง')
        .required('กรุณากรอกรหัสไปรษณีย์')
        .test('', 'กรุณาใส่ตัวเลข', function(value) {
            //check citizenId pattern
            return /\d+/.test(value)
        }),
    })
    )  
})