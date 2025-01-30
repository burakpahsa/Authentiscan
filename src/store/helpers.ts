import { supabase } from '../lib/supabase';

const THRESHOLD = 3; // Adjust the threshold as needed

export const checkAndFlagProduct = async (qrCode: string) => {
  const { data: productScans, error } = await supabase
    .from("scans")
    .select("ip_address")
    .eq("qr_code", qrCode)

  if (error) {
    console.error("Error fetching product scans:", error);
    return;
  }

  if (!productScans) return;

  const ipAddresses = productScans.map((scan) => scan.ip_address)
  const count = new Set(ipAddresses).size

  // Flag the product if the threshold is reached
  if (count >= THRESHOLD) {
    const { error: updateError } = await supabase
      .from("products")
      .update({ flagged: true })
      .eq("qr_code", qrCode);

    if (updateError) {
      console.error("Error flagging product:", updateError);
    }
  }
};

export const logRequest = async (productQr: string, isVerified: boolean, ipAddress?: string) => {
    try {
      await supabase.from('scans').insert([{ ip_address: ipAddress, qr_code: productQr, is_verified: isVerified }])
      if (isVerified && ipAddress) {
        checkAndFlagProduct(productQr)
      }
    } catch (error) {
      console.error(error)
    }
  }
