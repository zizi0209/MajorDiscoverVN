// Template mặc định cho mỗi nhóm ngành: subjects, pros, cons
type CatTemplate = { s: string[]; p: string[]; c: string[] };
export const CAT_TPL: Record<string, CatTemplate> = {
  "ke-toan": {
    s: ["A00","A01","D01"],
    p: ["Nhu cầu tuyển dụng ổn định ở mọi doanh nghiệp","Có thể thi chứng chỉ quốc tế CPA, ACCA","Lộ trình thăng tiến rõ ràng"],
    c: ["Công việc lặp lại, cần tính kiên nhẫn cao","Áp lực mùa quyết toán thuế","Một phần công việc có nguy cơ bị tự động hóa"],
  },
  "tai-chinh-ngan-hang": {
    s: ["A00","A01","D01","D07"],
    p: ["Thu nhập hấp dẫn, nhiều cơ hội thăng tiến","Tiếp cận thị trường tài chính quốc tế","Kỹ năng phân tích dữ liệu được trau dồi"],
    c: ["Áp lực doanh số và KPI cao","Thị trường biến động, rủi ro nghề nghiệp","Yêu cầu cập nhật kiến thức liên tục"],
  },
  "kinh-te-quan-tri": {
    s: ["A00","A01","D01","D07"],
    p: ["Kiến thức đa dạng, linh hoạt chuyển đổi ngành","Rèn luyện kỹ năng lãnh đạo và tư duy chiến lược","Cơ hội khởi nghiệp cao"],
    c: ["Kiến thức rộng nhưng thiếu chuyên sâu khi mới ra trường","Cạnh tranh gay gắt do số lượng cử nhân lớn","Đòi hỏi kỹ năng mềm và ngoại ngữ tốt"],
  },
  "cntt": {
    s: ["A00","A01","D01"],
    p: ["Cơ hội việc làm rộng mở, thu nhập cao","Có thể làm remote, linh hoạt","Nhu cầu nhân lực tăng trưởng mạnh"],
    c: ["Cạnh tranh cao, phải liên tục cập nhật công nghệ","Áp lực deadline, ngồi máy tính nhiều","Tuổi nghề lập trình viên bị định kiến"],
  },
  "ban-dan": {
    s: ["A00","A01"],
    p: ["Ngành mũi nhọn quốc gia, nhiều học bổng","Thu nhập rất cao khi có kinh nghiệm","Cơ hội làm việc tại tập đoàn đa quốc gia"],
    c: ["Đòi hỏi nền tảng Toán-Lý rất vững","Số lượng trường đào tạo còn ít","Môi trường phòng sạch khắt khe"],
  },
  "bao-chi-marketing": {
    s: ["D01","C00","D14","D15"],
    p: ["Công việc sáng tạo, năng động","Nhiều cơ hội trong thời đại số","Kết nối rộng, phát triển thương hiệu cá nhân"],
    c: ["Áp lực deadline và content liên tục","Thu nhập ban đầu chưa cao","Cạnh tranh từ freelancer và AI"],
  },
  "su-pham": {
    s: ["A00","A01","D01","C00"],
    p: ["Được miễn học phí, có phụ cấp","Nghề cao quý, được xã hội tôn trọng","Công việc ổn định, nhiều ngày nghỉ"],
    c: ["Thu nhập khởi điểm thấp","Áp lực từ phụ huynh và chương trình","Hạn chế cơ hội chuyển ngành"],
  },
  "y-duoc": {
    s: ["B00","A00"],
    p: ["Nghề danh giá, thu nhập tăng theo kinh nghiệm","Cơ hội mở phòng khám/nhà thuốc riêng","Đóng góp trực tiếp cho sức khỏe cộng đồng"],
    c: ["Thời gian đào tạo dài (5-6 năm)","Áp lực công việc và trách nhiệm rất lớn","Điểm chuẩn đầu vào cực kỳ cao"],
  },
  "thu-y": {
    s: ["B00","A00","A02"],
    p: ["Nhu cầu cao trong chăn nuôi công nghiệp","Có thể mở phòng khám thú y riêng","Đa dạng cơ hội: thú cưng, gia súc, hoang dã"],
    c: ["Môi trường làm việc vất vả","Rủi ro lây nhiễm bệnh từ động vật","Thu nhập phụ thuộc vùng miền"],
  },
  "cong-an-quan-doi": {
    s: ["A00","A01","C00"],
    p: ["Được đào tạo miễn phí, có lương","Công việc ổn định, chế độ đãi ngộ tốt","Được xã hội tôn trọng, phục vụ Tổ quốc"],
    c: ["Kỷ luật nghiêm ngặt, hạn chế tự do cá nhân","Điều kiện sức khỏe và lý lịch khắt khe","Có thể phải luân chuyển công tác xa"],
  },
  "thiet-ke-do-hoa": {
    s: ["H00","V00","H01","D01"],
    p: ["Công việc sáng tạo, đa dạng dự án","Nhu cầu cao trong kỷ nguyên số","Có thể freelance, làm việc tự do"],
    c: ["Cạnh tranh cao, cần portfolio mạnh","Thu nhập ban đầu không ổn định","Áp lực sáng tạo liên tục"],
  },
  "xay-dung-kien-truc": {
    s: ["A00","A01","V00","V01"],
    p: ["Nhu cầu xây dựng hạ tầng tăng mạnh","Thu nhập cao khi có kinh nghiệm","Kết hợp kỹ thuật và sáng tạo"],
    c: ["Thường xuyên làm việc ngoài công trường","Áp lực tiến độ dự án","Rủi ro an toàn lao động"],
  },
  "ngoai-ngu": {
    s: ["D01","D14","D15"],
    p: ["Dễ xin việc ở nhiều lĩnh vực","Cơ hội làm việc quốc tế","Bàn đạp học lên hoặc chuyển ngành"],
    c: ["Ngoại ngữ đã phổ biến, cần kỹ năng phụ","Nguy cơ bị AI thay thế trong dịch thuật đơn giản","Cạnh tranh từ sinh viên ngành khác giỏi ngoại ngữ"],
  },
  "ngoai-thuong": {
    s: ["A00","A01","D01","D07"],
    p: ["Kết hợp kinh tế và ngoại ngữ","Cơ hội làm việc với đối tác quốc tế","Thu nhập hấp dẫn ngành xuất nhập khẩu"],
    c: ["Đòi hỏi ngoại ngữ giỏi và hiểu biết pháp luật","Chịu ảnh hưởng bởi biến động thương mại toàn cầu","Áp lực KPI và đàm phán"],
  },
  "du-lich": {
    s: ["D01","C00","D14","D15"],
    p: ["Được đi nhiều nơi, trải nghiệm văn hóa","Ngành du lịch VN đang phục hồi mạnh","Rèn luyện kỹ năng giao tiếp đa ngôn ngữ"],
    c: ["Làm việc cuối tuần, lễ tết","Thu nhập phụ thuộc mùa vụ","Chịu ảnh hưởng bởi dịch bệnh, thiên tai"],
  },
  "o-to-co-khi": {
    s: ["A00","A01"],
    p: ["Thị trường ô tô VN đang bứt phá","Tiếp cận công nghệ xe điện, tự lái","Nhu cầu kỹ sư cơ khí luôn ổn định"],
    c: ["Môi trường làm việc nặng nhọc","Đòi hỏi sức khỏe và tính cẩn thận","Cần ngoại ngữ để vào tập đoàn lớn"],
  },
  "dien-tu-dong-hoa": {
    s: ["A00","A01"],
    p: ["Nhu cầu cao trong công nghiệp 4.0","Thu nhập tốt, đa dạng vị trí","Kết hợp phần cứng và phần mềm"],
    c: ["Kiến thức nền tảng khó, nhiều Toán-Lý","Công nghệ thay đổi nhanh","Cạnh tranh với CNTT trong mảng IoT"],
  },
  "hang-hai-thuy-loi": {
    s: ["A00","A01","B00"],
    p: ["Lương cao cho nghề đi biển","Đóng góp cho hạ tầng thủy lợi quốc gia","Ít cạnh tranh do ngành đặc thù"],
    c: ["Xa gia đình nếu đi biển","Điều kiện làm việc khắc nghiệt","Số trường đào tạo hạn chế"],
  },
  "hang-khong-hat-nhan": {
    s: ["A00","A01"],
    p: ["Ngành công nghệ cao, thu nhập rất tốt","Cơ hội làm việc quốc tế","Ít cạnh tranh do rào cản chuyên môn"],
    c: ["Yêu cầu sức khỏe và chuyên môn cực cao","Số lượng vị trí tuyển dụng hạn chế","Chi phí đào tạo lớn"],
  },
  "vat-lieu": {
    s: ["A00","A01","B00"],
    p: ["Ngành nền tảng cho công nghiệp sản xuất","Nhu cầu trong bán dẫn và năng lượng","Cơ hội nghiên cứu học thuật"],
    c: ["Ít được biết đến, khó tìm việc đúng ngành","Cần học lên cao để có vị trí tốt","Lương khởi điểm trung bình"],
  },
  "thuc-pham": {
    s: ["A00","B00","D07"],
    p: ["Nhu cầu ổn định, ai cũng cần ăn","Đa dạng cơ hội: sản xuất, QC, R&D","Phù hợp với người thích Hóa-Sinh"],
    c: ["Môi trường nhà máy, làm ca","Lương khởi điểm trung bình","Yêu cầu vệ sinh an toàn nghiêm ngặt"],
  },
  "in-giay": {
    s: ["A00","A01","D01"],
    p: ["Ngành hẹp, ít cạnh tranh","Cần thiết cho bao bì và xuất bản","Kết hợp kỹ thuật và thiết kế"],
    c: ["Xu hướng số hóa giảm nhu cầu in ấn","Số trường đào tạo rất ít","Lương trung bình"],
  },
  "sinh-hoa": {
    s: ["A00","B00","D07"],
    p: ["Ứng dụng rộng: y dược, nông nghiệp, môi trường","Cơ hội nghiên cứu khoa học","Ngành CNSH đang được đầu tư mạnh"],
    c: ["Cần học lên thạc sĩ/tiến sĩ để có việc tốt","Thị trường việc làm VN còn hạn chế","Đầu tư thiết bị phòng thí nghiệm lớn"],
  },
  "luat": {
    s: ["A00","A01","C00","D01"],
    p: ["Nhu cầu luật sư tăng theo phát triển kinh tế","Đa dạng lĩnh vực hành nghề","Vị thế xã hội cao"],
    c: ["Cần vượt kỳ thi hành nghề luật sư","Học nhiều lý thuyết, cần trí nhớ tốt","Áp lực xử lý vụ việc phức tạp"],
  },
  "mo-dia-chat": {
    s: ["A00","A01","B00"],
    p: ["Lương cao trong ngành dầu khí","Đóng góp cho khai thác tài nguyên quốc gia","Cơ hội làm việc nước ngoài"],
    c: ["Làm việc xa nhà, địa hình khắc nghiệt","Phụ thuộc giá dầu và chính sách khai thác","Ngành hẹp, ít cơ hội chuyển đổi"],
  },
  "my-thuat-am-nhac": {
    s: ["H00","V00","N00","S00"],
    p: ["Phát triển tài năng nghệ thuật","Công việc sáng tạo, tự do","Cơ hội biểu diễn và triển lãm"],
    c: ["Thu nhập không ổn định","Cạnh tranh khốc liệt","Khó xin việc nếu không có tên tuổi"],
  },
  "tai-nguyen-moi-truong": {
    s: ["A00","B00","D07"],
    p: ["Xu hướng toàn cầu về phát triển bền vững","Nhiều dự án môi trường cần nhân lực","Đóng góp cho bảo vệ hành tinh"],
    c: ["Lương khởi điểm trung bình","Thường phải đi khảo sát thực địa","Phụ thuộc vào chính sách nhà nước"],
  },
  "tam-ly": {
    s: ["C00","D01","B00","D14"],
    p: ["Nhu cầu ngày càng cao tại VN","Đa dạng: HR, marketing, trị liệu, tham vấn","Thấu hiểu bản thân và người khác"],
    c: ["Nghề trị liệu ở VN còn mới, lương chưa cao","Học nhiều lý thuyết trừu tượng","Ảnh hưởng tâm lý nếu không cân bằng"],
  },
  "the-thao": {
    s: ["T00","T01"],
    p: ["Rèn luyện sức khỏe và kỷ luật","Cơ hội trong huấn luyện và quản lý thể thao","Ngành thể thao chuyên nghiệp đang phát triển"],
    c: ["Tuổi nghề thi đấu ngắn","Thu nhập phụ thuộc thành tích","Rủi ro chấn thương"],
  },
  "thoi-trang": {
    s: ["H00","V00","A00","D01"],
    p: ["Ngành công nghiệp may mặc VN top thế giới","Cơ hội sáng tạo và kinh doanh","Nhu cầu xuất khẩu thời trang lớn"],
    c: ["Cạnh tranh từ thời trang nhanh","Áp lực theo trend liên tục","Môi trường xưởng may vất vả"],
  },
  "nong-lam-thuy-san": {
    s: ["A00","B00","D01"],
    p: ["Nông nghiệp là xương sống kinh tế VN","Nông nghiệp công nghệ cao đang bùng nổ","Nhiều học bổng và chính sách hỗ trợ"],
    c: ["Định kiến xã hội về nghề nông","Phụ thuộc thời tiết và thị trường","Làm việc ở nông thôn, xa đô thị"],
  },
  "toan-thong-ke": {
    s: ["A00","A01"],
    p: ["Nền tảng mạnh cho Data Science và AI","Tư duy logic vượt trội","Linh hoạt chuyển sang tài chính, CNTT"],
    c: ["Học thuật nặng, nhiều lý thuyết trừu tượng","Khó tìm việc đúng ngành thuần Toán","Cần học thêm kỹ năng ứng dụng"],
  },
  "nhan-su": {
    s: ["A00","A01","C00","D01"],
    p: ["Mọi tổ chức đều cần bộ phận nhân sự","Rèn kỹ năng giao tiếp và quản lý","Lộ trình rõ: HR → HR Manager → CHRO"],
    c: ["Xử lý xung đột nội bộ gây stress","Cạnh tranh với cử nhân QTKD, Luật","Lương khởi điểm trung bình"],
  },
  "van-hoa-xa-hoi": {
    s: ["C00","D01","D14"],
    p: ["Hiểu sâu về xã hội và con người","Đa dạng cơ hội: nghiên cứu, truyền thông, NGO","Phát triển tư duy phản biện"],
    c: ["Thu nhập thấp nếu làm nghiên cứu thuần","Khó ứng dụng thực tế ngay","Ít vị trí tuyển dụng chuyên môn hẹp"],
  },
  "khoa-hoc-tu-nhien": {
    s: ["A00","A01"],
    p: ["Nền tảng khoa học vững chắc","Cơ hội nghiên cứu và giảng dạy","Chuyển đổi sang nhiều ngành ứng dụng"],
    c: ["Cần học lên cao để có vị trí tốt","Thị trường việc làm hẹp","Lương nghiên cứu khoa học chưa hấp dẫn"],
  },
};
