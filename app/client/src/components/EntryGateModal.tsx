import React, { useState } from "react";
import {
  Button,
  Input,
  Label,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@pkg/awsome";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../auth/adminCredentials";

type Props = {
  open: boolean;
  onGuest: () => void;
  onAdminSuccess: () => void;
};

export function EntryGateModal({ open, onGuest, onAdminSuccess }: Props) {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const resetAdminFlow = () => {
    setShowAdminForm(false);
    setLastError(null);
    setUsername("");
    setPassword("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setLastError(null);
    const ok = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
    setSubmitting(false);
    if (ok) {
      onAdminSuccess();
    } else {
      setLastError("用户名或密码不正确，请重试。");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) resetAdminFlow();
      }}
    >
      <DialogContent
        className="sm:max-w-[400px]"
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>进入编辑器</DialogTitle>
          <DialogDescription>
            请选择身份。未通过管理员验证的访问将视为访客。
          </DialogDescription>
        </DialogHeader>

        {!showAdminForm ? (
          <div className="flex flex-col gap-3">
            <Button size="lg" className="w-full" onClick={onGuest}>
              以访客继续
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => setShowAdminForm(true)}
            >
              管理员登录
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {lastError ? (
              <p className="text-sm text-destructive">{lastError}</p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={submitting}>
                {submitting ? "登录中..." : "登录"}
              </Button>
              <Button type="button" variant="outline" onClick={resetAdminFlow}>
                返回
              </Button>
              <Button type="button" variant="link" onClick={onGuest}>
                改选访客继续
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
