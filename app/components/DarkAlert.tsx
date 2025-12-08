import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
type DarkAlertProps = {
  visible: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

export default function DarkAlert({
  visible,
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = "OK",
  cancelText = "Cancel",
}: DarkAlertProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            backgroundColor: "#111827",
            padding: 20,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#1f2937",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "600",
              marginBottom: 10,
            }}
          >
            {title}
          </Text>

          <Text style={{ color: "#9ca3af", marginBottom: 20 }}>
            {message}
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={onCancel} style={{ marginRight: 20 }}>
              <Text style={{ color: "#9ca3af", fontSize: 16 }}>
                {cancelText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onConfirm}>
              <Text style={{ color: "#3B82F6", fontSize: 16, fontWeight: "600" }}>
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
