import $axios from "@/shared/lib/(cs)axios";

const code = "1"
$axios.get(`/api/v1/promo-code/${code}`).then(res => res)
